using DesireListApplicationv1.Models;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace DesireListApplicationv1.Controllers
{
    public class ItemListController : ApiController
    {
        public static List<ItemList> itemLists = new List<ItemList>
        {
            // Mock items
            new ItemList(){ Id = 0, Name = "Groceries", Items = {
                    new Item{ Id = 0, Name = "Milk", ListId = 0 },
                    new Item{ Id = 1, Name = "Bread", ListId = 0 },
                    new Item{ Id = 2, Name = "Cheese", ListId = 0 }
                }
            },
            new ItemList(){ Id = 1, Name = "Hardware"}
                
        };

        // GET: api/ItemList/5
        // Retrieves a single item list.
        // Returns a HttpActionResult to communicate to the front end if an error has occured
        public IHttpActionResult Get(int id)
        {
            //get the item list with the given id
            ItemList result =
                itemLists.FirstOrDefault(s => s.Id == id);

            //when a user provides a id that isn't there, a notfound result is returned (404)
            if (result == null)
            {
                return NotFound();
            }

            //Otherwise the correct existing list is returned
            return Ok(result);
        }

        // POST: api/ItemList
        // UPDATE
        public IEnumerable Post([FromBody]ItemList newList)
        {
            newList.Id = itemLists.Count;
            itemLists.Add(newList);

            return itemLists;
        }
    }
}
